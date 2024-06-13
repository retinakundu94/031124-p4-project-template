#!/usr/bin/env python3

from flask import request, session
from config import app, db, bcrypt, SQLAlchemy
from models import User, Carts, Items, BlogPost, Feedback
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
import stripe

URL_PREFIX = '/api'

#function for creating users
@app.post(URL_PREFIX + '/users')
def create_user():
    try:
        new_user = User(
            username = request.json['username'],
            age = request.json['age']
        )
        new_user._hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        return { 'error': str(e) }, 406
    
#function for checking session
@app.get(URL_PREFIX + "/check-session")
def check_session():
    user = User.query.where(User.id == session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    else:
        return {}, 204

#function for logging in users
@app.post(URL_PREFIX + '/login')
def login():
    user = User.query.where(User.username == request.json.get('username')).first()
    if user and bcrypt.check_password_hash(user._hashed_password, request.json.get('password')):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'error': 'username or password was invalid'}, 401

#function for logging out users
@app.delete(URL_PREFIX + '/logout')
def logout():
    session.pop('user_id')
    return {}, 204

#function for adding items to cart
@app.post(URL_PREFIX + '/carts')
def post_items_to_cart():
    try:

        
        item = Carts(
            user_id = session.get('user_id'),
            item_id = request.json.get('item_id')
        )

        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 201
    
    except sqlalchemy.exc.IntegrityError as error:
        return {"error": "Invalid data"}, 400
    except ValueError as error:
        return {"error": str(error)}

#function for getting all items associated with a user
@app.get(URL_PREFIX + '/carts')
def cart_items_by_user_id():
    user_cart = Carts.query.where(Carts.user_id == session.get('user_id')).all()
    if user_cart:
        return [cart.to_dict() for cart in user_cart], 200
    else:
        return {'error': 'Not found'}, 404

#function for deleting item from the users cart
@app.delete(URL_PREFIX + '/carts/<int:id>')
def delete_cart_item(id):
    cart_item = Carts.query.where(Carts.id == id).first()
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return {}, 204
    else:
        return {'error': 'Not found'}, 404

#function for getting items
@app.get(URL_PREFIX + '/items')
def all_items():
    return [item.to_dict() for item in Items.query.all()], 200

#function for getting item by id
@app.get(URL_PREFIX + '/items/<int:id>')
def item_by_id(id):
    user = User.query.where(User.id == id).first()
    if user:
        return user.to_dict(), 200
    else:
        return {'error': 'Not found'}, 404

#function adds items to the items table
@app.post(URL_PREFIX + '/items')
def post_items():
    try:
        item = Items(
            name = request.json.get('name'),
            price = request.json.get('price'),
            image = request.json.get('image'),
            category = request.json.get('category'),
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 201
    except sqlalchemy.exc.IntegrityError as error:
        return {"error": "Invalid data"}, 400
    except ValueError as error:
        return {"error": str(error)}
    
#functions deletes item form the items table
@app.delete(URL_PREFIX + '/items/<int:id>')
def delete_item(id):
    item = Items.query.where(Items.id == id).first()
    if item:
        db.session.delete(item)
        db.session.commit()
        return {}, 204
    else:
        return {'error': 'Not found'}, 404
    
#function patches item by id in table
@app.patch(URL_PREFIX + '/items/<int:id>')
def patch_item_by_id(id):
    item = Items.query.where(Items.id == id).first()
    if item:
        for key in request.json.keys():
            setattr(item, key, request.json[key])
        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 202
    else:
        return {'error': 'Not found'}, 404
    
#function for getting Blog posts
@app.get(URL_PREFIX + '/blogpost')
def all_blog_posts():
    return [bp.to_dict() for bp in BlogPost.query.all()], 200

#function for getting blog posts by id; USE POSTMAN
@app.get(URL_PREFIX + '/blogpost/<int:id>')
def blogpost_by_id(id):
    bp = BlogPost.query.where(BlogPost.id == id).first()
    if bp:
        return bp.to_dict(), 200
    else:
        return {'error': 'Not found'}, 404
    
#function adds posts   
@app.post(URL_PREFIX + '/blogpost')
def post_blogpost():
    try:
        blog_post = BlogPost(
            title=request.json.get('title'),
            content=request.json.get('content')
        )
        db.session.add(blog_post)
        db.session.commit()
        return blog_post.to_dict(), 201
    except sqlalchemy.exc.IntegrityError:
        return {"error": "Invalid data"}, 400
    except ValueError as error:
        return {"error": str(error)}, 400

#function patches blog post by id in table
@app.patch(URL_PREFIX + '/blogpost/<int:id>')
def patch_blogpost_by_id(id):
    blog_post = BlogPost.query.where(BlogPost.id == id).first()
    if blog_post:
        for key in request.json.keys():
            setattr(blog_post, key, request.json[key])
        db.session.add(blog_post)
        db.session.commit()
        return blog_post.to_dict(), 202
    else:
        return {'error': 'Not found'}, 404
    
#function deletes posts from blogpost table
@app.delete(URL_PREFIX + '/blogpost/<int:id>')
def delete_blogpost(id):
    blog_post = BlogPost.query.where(BlogPost.id == id).first()
    if blog_post:
        db.session.delete(blog_post)
        db.session.commit()
        return {}, 204
    else:
        return {'error': 'Not found'}, 404
    
#add feedback submitted by new user    
@app.post(URL_PREFIX + '/feedback')
def submit_feedback():
    try:
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'User not logged in'}, 401

        feedback = Feedback(
            user_id=user_id,
            name=request.json.get('name'),
            email=request.json.get('email'),
            feedback=request.json.get('feedback')
        )

        db.session.add(feedback)
        db.session.commit()
        return feedback.to_dict(), 201

    except Exception as e:
        return {'error': str(e)}, 406

@app.post(URL_PREFIX + '/create-payment-intent')
def create_payment():
    try:
        user_id = request.json.get('user_id')

        if not user_id:
            return {'error': 'User ID is required'}, 400

        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404

        # total amount
        total_amount = sum(cart_item.item.price for cart_item in user.carts)

        # paymentintent
        intent = stripe.PaymentIntent.create(
            amount=total_amount * 100,  # stripe requires it to be in cents
            currency='usd'
        )
        return {"client_secret": intent['client_secret']}, 200
    
    except Exception as e:
        return {'error': str(e)}, 403
    




if __name__ == '__main__':
    app.run(port=5555, debug=True)

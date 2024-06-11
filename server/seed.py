#!/usr/bin/env python3

from app import app
from models import db , Items
from faker import Faker

faker = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Seeding database...")

        Items.query.delete()
        items = []

        # write your seeds here!

        i = Items(image="images/Chain-Link-Ring.jpg", category="Rings", name="Chain Link Ring", price="40")
        items.append(i)

        i = Items(image="images/CZ-Tennis-Bracelet.jpg", category="Bracelets", name="CZ Tennis Bracelet", price="55")
        items.append(i)

        i = Items(image="images/Diamond-Paperclip-Bracelet.jpg", category="Bracelets", name="Diamond Paperclip Bracelet", price="50")
        items.append(i)

        i = Items(image="images/Diamond-Pendant-Necklace.jpg", category="Necklaces", name="Diamond Pendant Necklace", price="70")
        items.append(i)

        i = Items(image="images/Diamond-Tennis-Necklace.jpg", category="Necklaces", name="Diamond Tennis Necklace", price="70")
        items.append(i)

        i = Items(image="images/Emerald-Tennis-Bracelet.jpg", category="Bracelets", name="Emerald Tennis Bracelet", price="40")
        items.append(i)

        i = Items(image="images/Evil-eye-Bracelet.jpg", category="Bracelets", name="Evil Eye Bracelet", price="40")
        items.append(i)

        i = Items(image="images/Evil-Eye-Necklace.jpg", category="Necklaces", name="Evil Eye Necklace", price="65")
        items.append(i)

        i = Items(image="images/Flower-Necklace.jpg", category="Necklaces", name="Flower Necklace", price="60")
        items.append(i)

        i = Items(image="images/Flower-Ring.jpg", category="Rings", name="Flower Ring", price="40")
        items.append(i)

        i = Items(image="images/Herringbone-Necklace.jpg", category="Necklaces", name="Herringbone Necklace", price="50")
        items.append(i)

        i = Items(image="images/Multistone-Diamond-Ring.jpg", category="Rings", name="Multistone Diamond Ring", price="60")
        items.append(i)

        i = Items(image="images/Oval-Diamond-Ring.jpg", category="Rings", name="Oval Diamond Ring", price="60")
        items.append(i)

        i = Items(image="images/Star-Dome-Ring.jpg", category="Rings", name="Star Dome Ring", price="55")
        items.append(i)

        i = Items(image="images/Stone-studded-Paperclip-Bracelet.jpg", category="Bracelets", name="Stone studded Paperclip Bracelet", price="45")
        items.append(i)

        db.session.add_all(items)
        db.session.commit()

        print("Seeding complete!")

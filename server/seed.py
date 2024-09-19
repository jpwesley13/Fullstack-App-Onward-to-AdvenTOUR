#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Trainer, Habitat, Review, Region, Biome, Sighting

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Trainer.query.delete()
        Habitat.query.delete()
        Review.query.delete()
        Region.query.delete()
        Biome.query.delete()
        Sighting.query.delete()
        
        regions = []
        region_names = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea", "Orre", "Ultra Space", "Kitakami", "Almia", "Oblivia", "Lental", "Uncharted"]

        for region_name in region_names:
            region = Region(
                name = region_name
            )
            regions.append(region)
        
        db.session.add_all(regions)

        biomes = []
        biome_names = ['Coastal', 'Polar', 'Taiga', 'Mires', 'Forest (conif.)', 'Forest (decid.)', 'Forest (tropical rain)', 'Forest (temperate rain)', 'Grasslands', 'Shrublands', 'Desert', 'Savanna', 'Wetland', 'River and Stream', 'Lake', 'Intertidal', 'Reef', 'Sea', 'Ocean', 'Deep Ocean', 'Cavern', 'Mountain', 'Ruins', 'City', 'No Preference']

        for biome_name in biome_names:
            biome = Biome(
                name = biome_name
            )
            biomes.append(biome)

        db.session.add_all(biomes)

        trainers = []

        trainer1 = Trainer(
            name = "Cynthia",
            age = 24,
            image = "https://www.serebii.net/anime/pictures/pokemon/1206/DP243.jpg"
        )
        trainer1.password_hash = trainer1.name + '1337'
        trainer1.biome = rc(biomes)
        trainers.append(trainer1)

        trainer2 = Trainer(
            name = "Casey",
            age = 11,
            image = "https://www.giantbomb.com/a/uploads/scale_medium/16/164924/2341034-casey.png"
        )
        trainer2.password_hash = trainer2.name + '1337'
        trainer2.biome = rc(biomes)
        trainers.append(trainer2)

        trainer3 = Trainer(
            name = "Wulfric",
            age = 44,
            image = "https://www.serebii.net/anime/characters/pics/wulfric.jpg"
        )
        trainer3.password_hash = trainer3.name + '1337'
        trainer3.biome = rc(biomes)
        trainers.append(trainer3)

        trainer4 = Trainer(
            name = "Mina",
            age = 19,
            image = "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/08/551.jpg"
        )
        trainer4.password_hash = trainer4.name + '1337'
        trainer4.biome = rc(biomes)
        trainers.append(trainer4)

        trainer5 = Trainer(
            name = "Hop",
            age = 14,
            image = "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/02/Hop-Anime-Pokemon-10-Things-About-Hop.jpg"
        )
        trainer5.password_hash = trainer5.name + '1337'
        trainer5.biome = rc(biomes)
        trainers.append(trainer5)

        trainer6 = Trainer(
            name = "Bea",
            age = 20,
            image = "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/02/Pokemon-Twilight-Wings-Episode-2-header.png"
        )
        trainer6.password_hash = trainer6.name + '1337'
        trainer6.biome = rc(biomes)
        trainers.append(trainer6)

        trainer7 = Trainer(
            name = "Tracey",
            age = 15,
            image = "https://media.pocketmonsters.net/characters/1/128.png/t/325.png"
        )
        trainer7.password_hash = trainer7.name + '1337'
        trainer7.biome = rc(biomes)
        trainers.append(trainer7)

        trainer8 = Trainer(
            name = "Dawn",
            age = 14,
            image = "https://i.pinimg.com/736x/b3/59/f3/b359f3247748945061f56884017140ba.jpg"
        )
        trainer8.password_hash = trainer8.name + '1337'
        trainer8.biome = rc(biomes)
        trainers.append(trainer8)

        trainer9 = Trainer(
            name = "Friede",
            age = 30,
            image = "https://cdn.myanimelist.net/r/200x268/images/characters/6/511891.jpg?s=62e7c98d5f7dff8dd1462f1bc877acb2"
        )
        trainer9.password_hash = trainer9.name + '1337'
        trainer9.biome = rc(biomes)
        trainers.append(trainer9)

        trainer10 = Trainer(
            name = "Pikala",
            age = 18,
            image = "https://media.pocketmonsters.net/characters/32/3278.png/t/325.png"
        )
        trainer10.password_hash = trainer10.name + '1337'
        trainer10.biome = rc(biomes)
        trainers.append(trainer10)

        db.session.add_all(trainers)

        habitats = []

        habitat1 = Habitat(
            name = "Burned Tower",
            image = "https://static.wikia.nocookie.net/smashtopia/images/6/6b/Burned_Tower.png",
            region_id = 2
        )
        habitats.append(habitat1)

        habitat2 = Habitat(
            name = "Spear Pillar",
            image = "https://archives.bulbagarden.net/media/upload/7/76/Spear_Pillar_PG.png",
            region_id = 4
        )
        habitats.append(habitat2)

        habitat3 = Habitat(
            name = "Lake Acuity",
            image = "https://archives.bulbagarden.net/media/upload/5/5c/Lake_Acuity_winter_anime.png",
            region_id = 4
        )
        habitats.append(habitat3)

        habitat4 = Habitat(
            name = "Kanto Power Plant",
            image = "https://archives.bulbagarden.net/media/upload/0/02/Kanto_Power_Plant_anime.png",
            region_id = 1
        )
        habitats.append(habitat4)

        habitat5 = Habitat(
            name = "Mt. Chimney",
            image = "https://archives.bulbagarden.net/media/upload/8/85/Mt_Chimney_anime.png",
            region_id = 3
        )
        habitats.append(habitat5)

        habitat6 = Habitat(
            name = "Dragonspiral Tower",
            image = "https://archives.bulbagarden.net/media/upload/3/3e/Dragonspiral_Tower_anime.png",
            region_id = 5
        )
        habitats.append(habitat6)

        habitat7 = Habitat(
            name = "Terminus Cave",
            image = "https://archives.bulbagarden.net/media/upload/8/8c/Terminus_Cave_anime.png",
            region_id = 6
        )
        habitats.append(habitat7)

        habitat8 = Habitat(
            name = "Poni Canyon",
            image = "https://archives.bulbagarden.net/media/upload/b/b5/Vast_Poni_Canyon_SM.png",
            region_id = 7
        )
        habitats.append(habitat8)

        habitat9 = Habitat(
            name = "Slumbering Weald",
            image = "https://archives.bulbagarden.net/media/upload/b/b1/Slumbering_Weald_altar_SwSh.png",
            region_id = 8
        )
        habitats.append(habitat9)

        habitat10 = Habitat(
            name = "Area Zero",
            image = "https://archives.bulbagarden.net/media/upload/a/a0/Upper_Area_Zero.png",
            region_id = 9
        )
        habitats.append(habitat10)

        habitat11 = Habitat(
            name = "Agate Village",
            image = "https://archives.bulbagarden.net/media/upload/5/56/Relic_Stone.png",
            region_id = 10
        )
        habitats.append(habitat11)

        habitat12 = Habitat(
            name = "Megalopolis",
            image = "https://archives.bulbagarden.net/media/upload/d/d2/Ultra_Sun_Ultra_Moon_Ultra_Megalopolis_artwork.png",
            region_id = 11
        )
        habitats.append(habitat12)

        habitat13 = Habitat(
            name = "Crystal Pool",
            image = "https://archives.bulbagarden.net/media/upload/d/d0/Crystal_Pool.png",
            region_id = 12
        )
        habitats.append(habitat13)

        habitat14 = Habitat(
            name = "Vien Forest",
            image = "https://archives.bulbagarden.net/media/upload/b/bc/Vermilion_Forest.png",
            region_id = 13
        )
        habitats.append(habitat14)

        habitat15 = Habitat(
            name = "Coral Sea",
            image = "https://archives.bulbagarden.net/media/upload/6/61/Coral_Sea_4_Ranger3.png",
            region_id = 14
        )
        habitats.append(habitat15)

        habitat16 = Habitat(
            name = "Abyssal Ruins",
            image = "https://archives.bulbagarden.net/media/upload/4/47/Abyssal_Ruins_BW_Concept_Art.png",
            region_id = 5
        )
        habitats.append(habitat16)

        habitat17 = Habitat(
            name = "Shiver Snowfields",
            image = "https://www.serebii.net/newpokemonsnap/locations/research/snowfieldsdayruins1.jpg",
            region_id = 15
        )
        habitats.append(habitat17)

        habitat18 = Habitat(
            name = "Hall of Origin",
            image = "https://archives.bulbagarden.net/media/upload/a/ad/Hall_of_Origin_PLA.png",
            region_id = 16
        )
        habitats.append(habitat18)

        habitat19 = Habitat(
            name = "Great Marsh",
            image = "https://archives.bulbagarden.net/media/upload/3/32/Great_Marsh_anime.png",
            region_id = 4
        )
        habitats.append(habitat19)

        habitat20 = Habitat(
            name = "Oni Mountain",
            image = "https://archives.bulbagarden.net/media/upload/6/6a/Oni_Mountain_SV.png",
            region_id = 12
        )
        habitats.append(habitat20)

        db.session.add_all(habitats)

        reviews = []
        for i in range(50):

            review = Review(
                content = fake.paragraph(nb_sentences=8),
                danger = randint(1,5),
                rating = randint(1,5)
            )

            review.trainer = rc(trainers)
            review.habitat = rc(habitats)

            reviews.append(review)

        db.session.add_all(reviews)

        sightings = []

        sighting1 = Sighting(
            name = "Celebi",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://facts.net/wp-content/uploads/2023/07/17-facts-about-celebi-1689269808.jpg"
        )
        sighting1.trainer = rc(trainers)
        sighting1.habitat = rc(habitats)
        sightings.append(sighting1)

        sighting2 = Sighting(
            name = "Ho-Oh",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/05/ho-hohh.v1.jpg"
        )
        sighting2.trainer = rc(trainers)
        sighting2.habitat = rc(habitats)
        sightings.append(sighting2)

        sighting3 = Sighting(
            name = "Raikou",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://archives.bulbagarden.net/media/upload/2/27/The_Legend_of_Thunder.png"
        )
        sighting3.trainer = rc(trainers)
        sighting3.habitat = rc(habitats)
        sightings.append(sighting3)

        sighting4 = Sighting(
            name = "Entei",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://archives.bulbagarden.net/media/upload/d/d6/EP259.png"
        )
        sighting4.trainer = rc(trainers)
        sighting4.habitat = rc(habitats)
        sightings.append(sighting4)

        sighting5 = Sighting(
            name = "Suicune(?)",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2023/03/walking-wake-in-pokemon-scarlet.jpg"
        )
        sighting5.trainer = rc(trainers)
        sighting5.habitat = rc(habitats)
        sightings.append(sighting5)

        sighting6 = Sighting(
            name = "Chimecho",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://facts.net/wp-content/uploads/2023/07/16-facts-about-chimecho-1689578484.jpg"
        )
        sighting6.trainer = rc(trainers)
        sighting6.habitat = rc(habitats)
        sightings.append(sighting6)

        sighting7 = Sighting(
            name = "Mesprit",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://archives.bulbagarden.net/media/upload/8/85/Mesprit_anime.png"
        )
        sighting7.trainer = rc(trainers)
        sighting7.habitat = rc(habitats)
        sightings.append(sighting7)

        sighting8 = Sighting(
            name = "Zorua",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://www.gematsu.com/wp-content/uploads/2021/10/Pokemon-Legends-PKMN_10-21-21-320x180.jpg"
        )
        sighting8.trainer = rc(trainers)
        sighting8.habitat = rc(habitats)
        sightings.append(sighting8)

        sighting9 = Sighting(
            name = "Ursaluna",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://www.siliconera.com/wp-content/uploads/2023/09/how-to-get-blood-moon-ursuluna-in-pokemon-scarlet-and-violet-dlc.jpg"
        )
        sighting9.trainer = rc(trainers)
        sighting9.habitat = rc(habitats)
        sightings.append(sighting9)

        sighting10 = Sighting(
            name = "Cobalion(?)",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://www.si.com/videogames/.image/t_share/MTk5OTM2MTQzMDQ1NzY0NzM2/pokmon-iron-crown.jpg"
        )
        sighting10.trainer = rc(trainers)
        sighting10.habitat = rc(habitats)
        sightings.append(sighting10)

        sighting11 = Sighting(
            name = "Pokemon Unknown",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://facts.net/wp-content/uploads/2023/07/20-facts-about-buzzwole-1689679970.jpg"
        )
        sighting11.trainer = rc(trainers)
        sighting11.habitat = rc(habitats)
        sightings.append(sighting11)

        sighting12 = Sighting(
            name = "Pokemon Unknown",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://archives.bulbagarden.net/media/upload/d/d6/Necrozma_Evolutions.png"
        )
        sighting12.trainer = rc(trainers)
        sighting12.habitat = rc(habitats)
        sightings.append(sighting12)

        sighting13 = Sighting(
            name = "Blue Voltorb",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://archives.bulbagarden.net/media/upload/5/50/Goh_Voltorb.png"
        )
        sighting13.trainer = rc(trainers)
        sighting13.habitat = rc(habitats)
        sightings.append(sighting13)

        sighting14 = Sighting(
            name = "Jirachi",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://www.serebii.net/newpokemonsnap/photodex/star/jirachi3.jpg"
        )
        sighting14.trainer = rc(trainers)
        sighting14.habitat = rc(habitats)
        sightings.append(sighting14)

        sighting15 = Sighting(
            name = "Lugia",
            blurb = fake.paragraph(nb_sentences=3),
            image = "https://www.serebii.net/newpokemonsnap/photodex/star/lugia3.jpg"
        )
        sighting15.trainer = rc(trainers)
        sighting15.habitat = rc(habitats)
        sightings.append(sighting15)

        db.session.add_all(sightings)

        db.session.commit()


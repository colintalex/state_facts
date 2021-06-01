# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Seeding DB..."
    State.destroy_all

    CO = State.create(
        name: 'Colorado',
        description: "From the highest sand dunes in North America at Great Sand Dunes National Park and Preserve to 54 Rocky Mountain peaks that rise over 14,000 feet to red-rock formations that seem to rip from the earth to the rolling grasslands of the eastern plains, Colorado has one of the most unique and varied natural landscapes in the world — and it’s a playground for discovery year-round.",
        flag_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Flag_of_Colorado.svg/510px-Flag_of_Colorado.svg.png",
        capitol_name: "Denver",
        population: 5893634
    )
    CO.facts.create(
        title: "The Home of the Colorado Rockies is in historic Coors Field.",
        details: "Built in 18328",
        lat: 39.75567607730272,
        lng: -104.99419955953775
    )
    CO.facts.create(
        title: "Mount Evans is the Highest Mountain Peak in Colorado",
        details: "14,271 ft above sea-level",
        lat: 39.5889610668807,
        lng: -105.64404320421464
    )


    NM = State.create(
        name: 'New Mexico',
        description: "Whether you crave a week of camping in a backcountry wilderness area, a day of singletrack mountain biking, a weekend rafting trip, hitting the links for a round of 18, or discovering where the Rockies begin, the Land of Enchantment has you covered. Adventurers and explorers, welcome to the Southwest’s best outdoor recreation.",
        flag_image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg",
        capitol_name: "Santa Fe",
        population: 2105005
    )
    NM.facts.create(
        title: "Los Alamos",
        details: "Original Construction Site for the Atomic Bombs during WWII",
        lat: 35.88343763461308,
        lng: -106.30806560664591
    )
    NM.facts.create(
        title: "Wheeler Peak",
        details: "Highest Mountain in New Mexico, 13,167 ft above sea-level",
        lat: 36.55761242008017,
        lng: -105.41679801330899
    )
puts "Seeding complete."
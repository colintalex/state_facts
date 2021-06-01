FactoryBot.define do
  factory :state do
    name { 'Colorado' }
    description { "MyText" }
    flag_image { "img/url" }
    capitol_name { "Denver" }
    population { 2500031 }
  end
end

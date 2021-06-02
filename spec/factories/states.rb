FactoryBot.define do
  factory :state do
    name { 'Colorado' }
    description { "State description goes here, it can be lengthy so don't be afraid to add full sentences." }
    flag_image { "img/url" }
    capitol_name { "Denver" }
    population { 2500031 }
  end
end

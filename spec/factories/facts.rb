FactoryBot.define do
  factory :fact do
    title { "Colorado" }
    details { "State details" }
    lat { 1.1231235 }
    lng { 1.53123321 }
    association :state
  end
end

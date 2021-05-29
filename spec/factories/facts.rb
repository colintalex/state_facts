FactoryBot.define do
  factory :fact do
    title { "MyString" }
    details { "MyText" }
    lat { 1.5 }
    lng { 1.5 }
    association :state
  end
end

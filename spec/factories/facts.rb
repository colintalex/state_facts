FactoryBot.define do
  factory :fact do
    title { "Colorado" }
    details { "State details are somewhat longer so this about right" }
    lat { 31.1231235 }
    lng { -140.53123321 }
    association :state
  end
end

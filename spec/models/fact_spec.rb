require 'rails_helper'

RSpec.describe Fact, type: :model do
  before(:all) do
    Fact.destroy_all
    @fact = create(:fact)
  end
  describe "Validations" do
    it { should validate_presence_of(:state) }

    it "is valid with valid attributes" do
      expect(@fact).to be_valid
    end
    it "is not valid without a title" do
      fact2 = build(:fact, title: nil)
      expect(fact2).to_not be_valid
    end
    it "is not valid without a details" do
      fact2 = build(:fact, details: nil)
      expect(fact2).to_not be_valid
    end
    it "is not valid without a lat" do
      fact2 = build(:fact, lat: nil)
      expect(fact2).to_not be_valid
    end
    it "is not valid without a lng" do
      fact2 = build(:fact, lng: nil)
      expect(fact2).to_not be_valid
    end
  end

  context "Associations" do
    it {should belong_to(:state)}
  end
end

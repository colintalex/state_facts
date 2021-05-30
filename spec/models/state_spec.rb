require 'rails_helper'

RSpec.describe State, type: :model do
  before(:all) do
    @state = create(:state)
  end

  context "Validations" do
    it "is valid with valid attributes" do
      state = create(:state)
      expect(state).to be_valid
    end
    it "is not valid without a name" do
      state2 = build(:state, name: nil)
      expect(state2).to_not be_valid
    end
    it "is not valid without a description" do
      state2 = build(:state, description: nil)
      expect(state2).to_not be_valid
    end
    it "is not valid without a flag_image" do
      state2 = build(:state, flag_image: nil)
      expect(state2).to_not be_valid
    end
    it "is not valid without a capitol_name" do
      state2 = build(:state, capitol_name: nil)
      expect(state2).to_not be_valid
    end
    it "is not valid without a population" do
      state2 = build(:state, population: nil)
      expect(state2).to_not be_valid
    end
  end

  context "Associations" do 
    it {should have_many(:facts)}
  end
end

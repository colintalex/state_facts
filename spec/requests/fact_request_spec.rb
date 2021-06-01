require 'rails_helper'

RSpec.describe 'Fact Requests', type: :request do
    before(:all) do
        Fact.destroy_all
        @fact = create(:fact)
    end
    describe "GET /facts/:id" do
        it "returns successful geoJson format with existing ID" do
            get "/facts/#{@fact.id}"

            expect(response.status).to eql(200)
            resp = JSON.parse(response.body, symbolize_names: true)
            
            expect(resp[:type]).to be_present()
            expect(resp[:type]).to eql('Feature')

            expect(resp[:properties]).to be_present()
            expect(resp[:properties][:id]).to be_present()
            expect(resp[:properties][:id]).to eql(@fact.id)
            expect(resp[:properties][:name]).to be_present()
            expect(resp[:properties][:name]).to eql(@fact.title)
            expect(resp[:properties][:amenity]).to eql("")
            expect(resp[:properties][:popupContent]).to be_present()
            expect(resp[:properties][:popupContent]).to eql(@fact.details)

            expect(resp[:geometry]).to be_present()
            expect(resp[:geometry][:type]).to be_present()
            expect(resp[:geometry][:type]).to eql('Point')
            expect(resp[:geometry][:coordinates]).to be_present()
            expect(resp[:geometry][:coordinates][0]).to eql(@fact.lng)
            expect(resp[:geometry][:coordinates][1]).to eql(@fact.lat)


            expect(resp[:title]).to_not be_present()
            expect(resp[:details]).to_not be_present()
            expect(resp[:lat]).to_not be_present()
            expect(resp[:lng]).to_not be_present()
        end
    end
end
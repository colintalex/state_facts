require 'rails_helper'

RSpec.describe 'Fact Requests', type: :request do
    before(:all) do
        Fact.destroy_all
        @fact = create(:fact)
    end
    describe "GET /facts/:id" do
        it "returns success with existing ID" do
            get "/facts/#{@fact.id}"

            expect(response.status).to eql(200)
            resp = JSON.parse(response.body, symbolize_names: true)
            expect(resp[:id]).to eql(@fact.id)
            expect(resp[:title]).to eql(@fact.title)
            expect(resp[:details]).to eql(@fact.details)
            expect(resp[:lat]).to eql(@fact.lat)
            expect(resp[:lng]).to eql(@fact.lng)
        end
    end
end
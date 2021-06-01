require 'rails_helper'

RSpec.describe 'State Requests', type: :request do
    before(:all) do
        State.destroy_all
        @state = create(:state)
    end
    describe "GET /states/:id" do
        it "returns success with existing ID" do
            get "/states/#{@state.id}"
            
            expect(response.status).to eql(200)
            resp = JSON.parse(response.body, symbolize_names: true)
            expect(resp[:id]).to eql(@state.id)
            expect(resp[:name]).to eql(@state.name)
            expect(resp[:description]).to eql(@state.description)
            expect(resp[:flag_image]).to eql(@state.flag_image)
            expect(resp[:capitol_name]).to eql(@state.capitol_name)
            expect(resp[:population]).to eql(@state.population)
        end
    end
end
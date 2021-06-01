class StatesController < ApplicationController

    def show
        @state = State.find_by_id(state_params[:id])
        render json: StateSerializer.new(@state).as_json
    end

    private

    def state_params
        params.permit(:id)
    end
end
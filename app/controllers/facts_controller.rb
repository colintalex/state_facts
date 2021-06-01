class FactsController < ApplicationController
  def show
    @fact = Fact.find_by_id(fact_params[:id])
    render json: @fact
  end

  private

  def fact_params
    params.permit(:id)
  end
end

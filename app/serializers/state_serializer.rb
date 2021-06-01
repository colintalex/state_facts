class StateSerializer < ActiveModel::Serializer
  include ActionView::Helpers::NumberHelper
  has_many :facts
  attributes :id, :name, :description, :capitol_name, :flag_image, :population

  def population
    number_with_delimiter(object.population)
  end
end

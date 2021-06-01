class FactSerializer < ActiveModel::Serializer
  attributes :id, :title, :details, :lat, :lng
end

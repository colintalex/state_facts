class FeatureSerializer < ActiveModel::Serializer
  attributes :type, :properties, :geometry

  def type
    "Feature"
  end

  def properties
    {
      "name": object.title,
      "amenity": "",
      "popupContent": object.details
    }
  end

  def geometry
    {
      "type": "Point",
      "coordinates": [object.lng, object.lat]
    }
  end
end

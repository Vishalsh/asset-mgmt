class AssetType
  include Mongoid::Document
  field :name
  field :image_path
  field :properties, type: Array

  validates_presence_of :name, :image_path, :properties

  has_many :asset_types


  def trim_properties properties

    property_array = []

    properties.each { |property|
       property_array.push property.strip
    }

    property_array
  end

end

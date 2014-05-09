class AssetType
  include Mongoid::Document
  field :name
  field :image_path
  field :properties, type: Array

  validates_presence_of :name, :properties
end

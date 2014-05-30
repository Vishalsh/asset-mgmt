class Asset
  include Mongoid::Document

  field :invoice_number
  field :serial_number
  field :purchased_date, type: Date
  field :mac_address
  field :warranty
  field :properties, type: Hash

  validates_presence_of :invoice_number, :serial_number, :purchased_date, :mac_address, :warranty, :properties

  belongs_to :asset_type

  def create_properties_hash(properties, params)
    asset_properties = {}

    properties.each { |property|
      asset_properties[property] = params[property]
    }
    asset_properties
  end

end

class Asset
  include Mongoid::Document

  field :invoice_number
  field :serial_number
  field :purchased_date, type: Date
  field :mac_address
  field :warranty

  validates_presence_of :invoice_number, :serial_number, :purchased_date, :mac_address, :warranty

end

class Admin
  include Mongoid::Document
  field :ad_id
  field :name

  validates_presence_of :ad_id, :name

end

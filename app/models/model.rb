class Model
  include Mongoid::Document
  field :name

  validates_presence_of :name

  belongs_to :company
end

class Office
  include Mongoid::Document

  field :name

  validates_presence_of :name

end

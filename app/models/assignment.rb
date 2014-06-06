class Assignment
  include Mongoid::Document

  field :start_date
  field :end_date
  field :assigned_to

  belongs_to :admin

  validates_presence_of :start_date, :end_date, :assigned_to

end

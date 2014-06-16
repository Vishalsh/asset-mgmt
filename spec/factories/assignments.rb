# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :valid_assignment, class: Assignment do |f|
    f.start_date '22-05-2014'
    f.end_date '24-05-2014'
    f.assigned_to 'vishalsh'
  end

  factory :invalid_assignment, class: Assignment do |f|
    f.start_date '20-05-2016'
    f.end_date '24-05-2014'
    f.assigned_to ''
  end

end

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :valid_office, class: Office do |f|
    f.name 'gurgaon'
  end

  factory :invalid_office, class: Office do |f|
    f.name ''
  end

end

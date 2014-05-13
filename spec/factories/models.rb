# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :valid_model, class: Model do |f|
    f.name 'India'
  end

  factory :invalid_model, class: Model do |f|
    f.name ''
  end

end

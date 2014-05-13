# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :valid_model, class: Model do |f|
    f.name '15 macbook pro'
  end

  factory :invalid_model, class: Model do |f|
    f.name ''
  end

end

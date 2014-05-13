require 'spec_helper'

describe Model do

  before(:each) do
    @valid_model = FactoryGirl.build(:valid_company)
  end

  it 'should be valid with proper values' do
    @valid_model.should be_valid
  end

  context "Validations" do
    [:name].each do |attr|
      it "should not be valid without #{attr}" do
        @valid_model[attr] = nil
        @valid_model.should_not be_valid
        @valid_model.errors.to_hash[attr].should_not be_nil
      end
    end
  end
  
end

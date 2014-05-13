require 'spec_helper'

describe Company do

  before(:each) do
    @valid_company = FactoryGirl.build(:valid_company)
  end

  it 'should be valid with proper values' do
    @valid_company.should be_valid
  end

  context "Validations" do
    [:name].each do |attr|
      it "should not be valid without #{attr}" do
        @valid_company[attr] = nil
        @valid_company.should_not be_valid
        @valid_company.errors.to_hash[attr].should_not be_nil
      end
    end
  end

end

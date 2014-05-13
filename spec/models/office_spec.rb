require 'spec_helper'

describe Office do

  before(:each) do
    @valid_office = FactoryGirl.build(:valid_company)
  end

  it 'should be valid with proper values' do
    @valid_office.should be_valid
  end

  context "Validations" do
    [:name].each do |attr|
      it "should not be valid without #{attr}" do
        @valid_office[attr] = nil
        @valid_office.should_not be_valid
        @valid_office.errors.to_hash[attr].should_not be_nil
      end
    end
  end

end

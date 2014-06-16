require 'spec_helper'

describe Assignment do

  before(:each) do
    @valid_assignment = FactoryGirl.build(:valid_assignment)
  end

  it 'should be valid with proper values' do
    @valid_assignment.should be_valid
  end

  context "Validations" do
    [:start_date, :end_date, :assigned_to].each do |attr|
      it "should not be valid without #{attr}" do
        @valid_assignment[attr] = nil
        @valid_assignment.should_not be_valid
        @valid_assignment.errors.to_hash[attr].should_not be_nil
      end
    end
  end

end

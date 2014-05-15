class BasePage < CapybaraPageObject::Page
  include RSpec::Matchers

  def initialize (page)
    raise "Not on the expected page" unless valid?
  end

  def valid?
    false
  end

  end
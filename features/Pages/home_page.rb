class HomePage < BasePage
  def initialize(page)
    @page = page
    raise "Not on the expected page" unless valid?
  end

end
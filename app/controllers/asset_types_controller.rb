class AssetTypesController < ApplicationController

  def index

    @asset_types = AssetType.all
    respond_to do |format|
      format.json {      render json: @asset_types }
      format.html
    end
  end

  def new

  end

end

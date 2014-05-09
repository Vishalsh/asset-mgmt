class AssetTypesController < ApplicationController

  def index
    @asset_types = AssetType.all
    respond_to do |format|
      format.json { render json: @asset_types }
      format.html
    end
  end

  def create
    asset_type = AssetType.new(name: params[:asset_type][:name], image_path: params[:asset_type][:image_path], properties: params[:asset_type][:properties])
    if asset_type.save
      respond_to do |format|
        format.json { render json: asset_type, status: :created }
      end
    else
      respond_to do |format|
        format.json { render json: asset_type.errors, status: :unprocessable_entity }
      end
    end
  end

end

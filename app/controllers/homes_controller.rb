class HomesController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:index, :add_image, :remove_image]
  def index
  end

  def add_image
    image = ImageAsset.create(:image_path => params[:file] )
    respond_to do |format|
      if image.save
        format.json {render json: { image_id: image.id, image_path: image.image_path_url}}
      else
        format.json {render json: { error: "Please upload other image"}}
      end
    end
  end  

  def remove_image
    ImageAsset.destroy params[:image_id].to_i
    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
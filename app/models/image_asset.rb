class ImageAsset < ActiveRecord::Base
  mount_uploader :image_path, AvatarUploader
end
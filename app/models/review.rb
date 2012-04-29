class Review < ActiveRecord::Base
  has_attached_file :image, :styles => {:thumb => "x46>", :big_thumb => "160x230>"}
  attr_accessible :name, :image, :person_id

  belongs_to :person
end
class Page < ActiveRecord::Base
  attr_accessible :title, :slug, :content, :person_id, :menu

  belongs_to :person
end
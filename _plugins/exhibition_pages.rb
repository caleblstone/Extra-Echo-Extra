# Auto-generates the three pages for every exhibition (landing / images / text)
# at build time. Editors only ever create an exhibition in the CMS — they never
# touch files or folders. Runs on Netlify (`bundle exec jekyll build`).
module ExhibitionPages
  # kind => { subdir under /exhibitions/<slug>/, layout, <body> class }
  PAGES = {
    "landing" => { :subdir => nil,      :layout => "exhibition",        :body_class => "" },
    "images"  => { :subdir => "images", :layout => "exhibition-images", :body_class => "images-page" },
    "text"    => { :subdir => "text",   :layout => "exhibition-text",   :body_class => "text-page" },
  }.freeze

  class ExhibitionPage < Jekyll::Page
    def initialize(site, base, exhibition, kind)
      @site = site
      @base = base

      slug = exhibition.data["slug"]
      slug = Jekyll::Utils.slugify(exhibition.basename_without_ext) if slug.nil? || slug.to_s.strip.empty?
      slug = slug.to_s.strip

      spec = PAGES[kind]
      @dir  = spec[:subdir] ? File.join("exhibitions", slug, spec[:subdir]) : File.join("exhibitions", slug)
      @name = "index.html"

      @content = ""
      @data = {
        "layout"          => spec[:layout],
        "exhibition_slug" => slug,
        "kind"            => kind,
        "body_class"      => spec[:body_class],
        "title"           => exhibition.data["title"],
      }

      process(@name)
    end

    # This page has no source file on disk; stop Jekyll trying to read one.
    def read_yaml(*)
      @data ||= {}
    end
  end

  class Generator < Jekyll::Generator
    safe true
    priority :normal

    def generate(site)
      collection = site.collections["exhibitions"]
      return if collection.nil?

      collection.docs.each do |exhibition|
        ExhibitionPages::PAGES.each_key do |kind|
          site.pages << ExhibitionPage.new(site, site.source, exhibition, kind)
        end
      end
    end
  end
end

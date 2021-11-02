require 'watir'
require 'webdrivers'
require 'minitest/autorun'
require 'pathname'

class TestMySite < MiniTest::Unit::TestCase
    def self.test_order
        :alpha
    end

    def test_00_PageFirstLoad_mustPrintAName
        # Open a browser - it is kept open for all the tests
        @@browser = Watir::Browser.new
        
        # Load the site
        @@myHTMLfile = Pathname.new("Content/index.html").realpath.to_s
        @@browser.goto @@myHTMLfile
        printedName = @@browser.text_field(name: "fname").value
        assert printedName.to_s.length > 0, "A name should be displayed"
    end

    def test_01_PageFirstLoad_reload
        oldPrintedName = @@browser.text_field(name: "fname").value.to_s

        # max 3 tries
        for i in 0..2
            # Reload page
            @@browser.goto @@myHTMLfile
            printedName = @@browser.text_field(name: "fname").value.to_s
            if printedName != oldPrintedName
                break
            end
        end

        assert printedName != oldPrintedName, "A new name should be displayed"
    end

    def test_01_PageFirstLoad_NSFW
        checkboxState = @@browser.checkbox(id: "allowNSFW").checked?

        assert checkboxState==false, "The NSFW checkbox must be unchecked at first load"
    end

    #TODO :
    # tester le bouton d'obtention de nouveau nom
    #     - cliquer dessus -> nom doit être différent (retry max 3)

    # tester le bouton copier
    #     - doit changer d'apparence quand on clique dessus
    #     - doit mettre une valeur dans le presse papier
    #     - doit revenir à l'apparence de départ au bout de 2 sec

    # tester le param get
    #     - param NSFW dans l'URL -> case cochée
    #     - si on revient sur la page sans le param NSFW -> case décochée

end


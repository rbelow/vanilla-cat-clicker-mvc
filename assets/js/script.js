// ================== Model ==================

let model = {
    currentCat: null,
    admin: false,
    cats: [
        {
            id: "michy-57136",
            name: "Michy",
            imgSrc: "assets/img/cat.jpg",
            imgId: "imgMichy",
            clickCount: 0
        },
        {
            id: "cony-57189",
            name: "Cony",
            imgSrc: "assets/img/cat-two.jpg",
            imgId: "imgCony",
            clickCount: 0
        },
        {
            id: "peter-74132",
            name: "Peter",
            imgSrc: "assets/img/cat-three.jpg",
            imgId: "imgPeter",
            clickCount: 0
        },
        {
            id: "hook-34812",
            name: "Hook",
            imgSrc: "assets/img/cat-four.jpg",
            imgId: "imgHook",
            clickCount: 0
        },
        {
            id: "roly-74982",
            name: "Roly",
            imgSrc: "assets/img/cat-five.jpg",
            imgId: "imgRoly",
            clickCount: 0
        }
    ]
}


// ================== Octopus ==================

// Cat Clicker Premium

// Two views with two renders; one for display, other for the list
// Separate chunks whenever its possible
// Octopus inits both

// 1. App loads up, it starts with a blank screen

// 2. List of cats is created

// 3. List *view* is populated with cats

// 4. The octopus changes de *currentCat*

// 5. Octopus says: "Render the display *view*". Octopus says when to render

// 6. When you click on cat, it runs a method that increases counter; first on model then on view

// 7. When you change the cat, octopus changes the model and calls render

// ------------------

// Cat Clicker Premium Pro

// 1. Add HTML

// 2. Set a boolean property in the model for showing or not the admin

// 3. One view for all admin options

// 4. This view listens to click events

// 5. In octopus one function to open the admin, other to close it and other for updating it

let octopus = {

    init: function() {
        model.currentCat = model.cats[0];

        listView.init();
        displayView.init();
        adminView.init();
    },

    getList: function() {
        return model.cats;
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    count: function(updateCounter) {
        updateCounter.clickCount += 1;

        let currentCount = updateCounter.clickCount;
        displayView.updateNum(currentCount);
    },

    getState: function() {
        return model.admin;
    },

    openAdmin: function() {
        model.admin = true;
        adminView.openPanel();
    },

    closeAdmin: function() {
        model.admin = false;
        adminView.closePanel();
    },

    updateCat: function() {
        this.getCurrentCat().name = document.getElementById("catName").value;
        this.getCurrentCat().imgSrc = document.getElementById("catURL").value;
        this.getCurrentCat().clickCount = Number(document.getElementById("catClicks").value);

        listView.init();
        displayView.init();
    }

};


// ================== View ==================

let listView = {

    init: function() {
        let catList = document.getElementById('catList');

        catList.innerHTML = '';
        this.render();
    },

    render: function() {
        octopus.getList().forEach(function(cat) {

            // If you need a reminder on adding event
            // listeners properly within a loop, check out
            // the reading node on how to deal with event
            // listeners and closures:
            // https://classroom.udacity.com/courses/ud989/lessons/3417188540/concepts/34803486710923

            // Create a DOM element for each cat
            let catElem = document.createElement('li');
            catElem.innerHTML = '<h4 id="' +
                cat.id +
                '" class="bg-primary">' +
                cat.name +
                '</h4>';

            // Render the DOM elements
            catList.appendChild(catElem);
        });
        this.listen();
    },

    listen: function() {
        octopus.getList().forEach(function(selectCat) {
            let catElem = document.getElementById(selectCat.id);

            catElem.addEventListener('click', function() {

                // TODO Separate the views from each other!
                // Get the current model state from octopus
                // separately for each view and don't pass
                // objects between views.

                octopus.setCurrentCat(selectCat);
                displayView.render();

                if (octopus.getState() === true) {
                    octopus.closeAdmin();
                };
            });
        });
    },

    /*refresh: function() {
        catList.innerHTML = '';
        this.init();
    }*/

};

// Display view
let displayView = {

    init: function() {
        let catArea = document.getElementById('catArea');
        let countArea = document.getElementById('countArea');

        catArea.innerHTML = '';
        this.render();
    },

    render: function() {
        // debugger;
        let cat = octopus.getCurrentCat();

        catArea.innerHTML = '<h2 id="' +
            cat.id +
            '">' +
            cat.name +
            '</h2><img id="' +
            cat.imgId +
            '" class="img-responsive img-rounded" src="' +
            cat.imgSrc +
            '" alt="Cat"><h3 id="countArea" class="text-info">' +
            cat.clickCount +
            '</h3>';

        this.listen(cat);
    },

    listen: function(click) {
        let catImg = document.getElementById(click.imgId);

        catImg.addEventListener('click', function() {
            octopus.count(click);
        });
    },

    updateNum: function(currentCount) {
        countArea.textContent = currentCount;
    },

    /*refresh: function() {
        catArea.innerHTML = '';
        this.init();
    }*/

};

// Admin view
let adminView = {

    init: function() {
        let catAdmin = document.getElementById("catAdmin");
        let admin = document.getElementById('admin');
        let catPanel = document.getElementById("catPanel");
        let saveButton = document.getElementById('saveButton');
        let cancel = document.getElementById('cancel');

        this.render();
    },

    render: function() {
        catAdmin.innerHTML = '<button id="admin" type="button" class="btn btn-primary">Admin</button>';
        this.listen();
    },

    openPanel: function() {
        let cat = octopus.getCurrentCat();

        // NOTE When HTML chunks are hardcoded in the HTML file
        // some strange things happen with the binded data. It doesn't
        // update the form name anymore, it starts to replicate cat clicks
        // and other issues that aren't easy to debug.

        /*
        document.getElementById("catName").setAttribute("value", cat.name);
        document.getElementById("catURL").setAttribute("value", cat.imgSrc);
        document.getElementById("catClicks").setAttribute("value", cat.clickCount);
        */

        catPanel.innerHTML = '<form class="form-horizontal" novalidate><div class="form-group"><label for="inputEmail" class="col-sm-2 control-label">Name</label><div class="col-sm-10"><input id="catName" type="text" class="form-control" id="inputEmail" value="' +
		cat.name +
		'"></div></div><div class="form-group"><label for="inputPassword" class="col-sm-2 control-label">ImgURL</label><div class="col-sm-10"><input id="catURL" type="url" class="form-control" id="inputPassword" value="' +
		cat.imgSrc +
		'"></div></div><div class="form-group"><label for="inputPassword" class="col-sm-2 control-label">#Clicks</label><div class="col-sm-10"><input id="catClicks" type="number" class="form-control" id="inputPassword" value="' +
		cat.clickCount +
		'"></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button id="cancel" type="reset" class="btn btn-danger">Cancel</button><button id="saveButton" type="submit" class="btn btn-success">Save</button></div></div></form>';

        // catPanel.style.display = "inline";
        this.listenPanel();
    },

    closePanel: function() {
        // catPanel.style.display = "none";
        catPanel.innerHTML = '';
    },

    listenPanel: function() {
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            octopus.updateCat();
            octopus.closeAdmin();
        });
        cancel.addEventListener('click', function() {
            octopus.closeAdmin();
        });
    },

    listen: function() {
        admin.addEventListener('click', function() {
            if (octopus.getState() === false) {
                octopus.openAdmin();
            } else {
                octopus.closeAdmin();
            }
        });
    }

    /*refresh: function() {
        catPanel.innerHTML = '';
        this.init();
    }*/

};


// ================== StartApp ==================

octopus.init();

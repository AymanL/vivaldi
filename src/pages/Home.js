import React from 'react'
import NavbarPage from "../components/Navbar/Navbar_Page";
import Section from './section';
import Activities from "../components/Activities/activities";
import Events from "../components/Events/event";
import Footer from "../components/Footer/footer";


class Home extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            navItems: [
                { id: 1, idnm: "home", navheading: "Accueil" },
                { id: 2, idnm: "activities", navheading: "Activité permanentes" },
                { id: 3, idnm: "events", navheading: "Évènements" },
                // { id: 4, idnm: "clients", navheading: "Tarifs" },
            ],
            pos: document.documentElement.scrollTop,
            imglight: true,
            navClass: ""
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.scrollNavigation, true);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }

    scrollNavigation = () => {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > this.state.pos) {
            this.setState({ navClass: "nav-sticky", imglight: false });
        }
        else {
            this.setState({ navClass: "", imglight: false });
        }
    };

	render() {

		const { classes } = this.props;

		return (
			<React.Fragment>
				<NavbarPage navItems={this.state.navItems} navClass={this.state.navClass} imglight={this.state.imglight} />

				{/* Importing section */}
				<Section />

				{/* Importing Service */}
				<Activities />		

                {/* Importing Features */}
                <Events />

                {/* Importing Footer */}
                <Footer />
			</React.Fragment>
		);
	}
}

export default Home;
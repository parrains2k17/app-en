
import getCandidates from './services/candidates';

import Stage from './components/Stage';
import CandidatePanel from './components/CandidatePanel';

import CandidateGroup from './containers/CandidateGroup';

const
    width  = window.innerWidth,
    height = window.innerHeight,
    canvas = document.querySelector('.js-canvas-container');

class AppController {
    constructor() {
        this.stage = new Stage(canvas, width, height);

        this.buildCandidates();
        this.candidatePanel = new CandidatePanel(
            '.js-candidate-panel',
            () => this.candidateClose()
        );
    }

    buildCandidates() {
        const candidatesData = getCandidates();

        this.candidates = candidatesData
            .map((candidate) => new CandidateGroup(
                {
                    screen: {
                        width,
                        height,
                    },
                    position: {
                        x: candidate.x(width, height),
                        y: candidate.y(width, height),
                    },
                },
                candidate.supporters,
                this
                // TODO pass candidate data toto
            ));

        this.candidates.forEach((candidate) => this.stage.add(candidate));
    }

    start() {
        this.stage.start();
    }

    candidateOpen(selected) {
        this.candidates.forEach((candidate) => {
            if (candidate !== selected) {
                candidate.hide(-width / 2);
            } else {
                candidate.activate(
                    width / 2,
                    height / 2
                );
            }
        });

        this.stage.center();
        this.candidatePanel.open();
    }

    candidateClose() {
        this.candidates.forEach((candidate) => candidate.reset());

        this.stage.active();
        this.candidatePanel.close();
    }
}

export default AppController;
import {
	Object3D
} from '../../../build/three.module.js';

import {
	XRHandPrimitiveModel
} from './XRHandPrimitiveModel.js';

import {
	XRHandMeshModel
} from './XRHandMeshModel.js';

import {
	fetchProfile
} from '../libs/motion-controllers.module.js';

const DEFAULT_PROFILES_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';
const DEFAULT_PROFILE = 'generic-hand';

class XRHandModel extends Object3D {

	constructor( controller ) {

		super();

		this.controller = controller;
		this.motionController = null;
		this.envMap = null;

		this.mesh = null;

	}

	updateMatrixWorld( force ) {

		super.updateMatrixWorld( force );

		if ( this.motionController ) {

			this.motionController.updateMesh();

		}

	}

}

class XRHandModelFactory {

	constructor() {

		this.path = '';

	}

	setPath( path ) {

		this.path = path;
		return this;

	}

	createHandModel( controller, profile, options ) {

		const handModel = new XRHandModel( controller );

		controller.addEventListener( 'connected', ( event ) => {

			const xrInputSource = event.data;

			if ( xrInputSource.hand && ! handModel.motionController ) {

				handModel.visible = true;
				handModel.xrInputSource = xrInputSource;

				// @todo Detect profile if not provided
				if ( profile === undefined || profile === 'spheres' ) {

					handModel.motionController = new XRHandPrimitiveModel( handModel, controller, this.path, xrInputSource.handedness, { primitive: 'sphere' } );

				} else if ( profile === 'boxes' ) {

					handModel.motionController = new XRHandPrimitiveModel( handModel, controller, this.path, xrInputSource.handedness, { primitive: 'box' } );

				} else if ( profile === 'oculus' ) {

					fetchProfile( xrInputSource, DEFAULT_PROFILES_PATH, DEFAULT_PROFILE ).then( ( { profile, assetPath } ) => {

						handModel.motionController = new XRHandMeshModel( handModel, controller, assetPath );

					} ).catch( ( err ) => {

						console.warn( err );

					} );

				}

			}

		} );

		controller.addEventListener( 'disconnected', () => {

			// handModel.motionController = null;
			// handModel.remove( scene );
			// scene = null;

		} );

		return handModel;

	}

}

export { XRHandModelFactory };

import { UIPanel, UIRow, UISelect, UISpan, UIText, UIInteger } from './libs/ui.js';

import { SidebarSettingsViewport } from './Sidebar.Settings.Viewport.js';
import { SidebarSettingsShortcuts } from './Sidebar.Settings.Shortcuts.js';
import { SidebarSettingsHistory } from './Sidebar.Settings.History.js';

function SidebarSettings( editor ) {

	var config = editor.config;
	var strings = editor.strings;

	var container = new UISpan();

	var settings = new UIPanel();
	settings.setBorderTop( '0' );
	settings.setPaddingTop( '20px' );
	container.add( settings );

	// language

	var options = {
		zh: '中文',
		en: 'English',
		fr: 'Français'
	};

	var languageRow = new UIRow();
	var language = new UISelect().setWidth( '150px' );
	language.setOptions( options );

	if ( config.getKey( 'language' ) !== undefined ) {

		language.setValue( config.getKey( 'language' ) );

	}

	language.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'language', value );

	} );

	languageRow.add( new UIText( strings.getKey( 'sidebar/settings/language' ) ).setWidth( '90px' ) );
	languageRow.add( language );

	settings.add( languageRow );

	// export precision

	var exportPrecisionRow = new UIRow();
	var exportPrecision = new UIInteger( config.getKey( 'exportPrecision' ) ).setRange( 2, Infinity );

	exportPrecision.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'exportPrecision', value );

	} );

	exportPrecisionRow.add( new UIText( strings.getKey( 'sidebar/settings/exportPrecision' ) ).setWidth( '90px' ) );
	exportPrecisionRow.add( exportPrecision );

	settings.add( exportPrecisionRow );

	//

	container.add( new SidebarSettingsViewport( editor ) );
	container.add( new SidebarSettingsShortcuts( editor ) );
	container.add( new SidebarSettingsHistory( editor ) );

	return container;

}

export { SidebarSettings };

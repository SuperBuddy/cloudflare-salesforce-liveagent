(function () {
	'use strict'

	const settings = {
		displayHelpButton: true,
		language: 'en',
		defaultMinimizedText: 'We are online!',
		disabledMinimizedText: 'Offline',
		loadingText: 'Loading...',
		avatarImgURL: false,
		prechatBackgroundImgURL: false,
		waitingStateBackgroundImgURL: false,
		smallCompanyLogoImgURL: false,
		storageDomain: false,
		enabledFeatures: ['LiveAgent'],
		entryFeature: 'LiveAgent',
		prepopulatedPrechatFields: {},
		extraPrechatInfo: [
			{
				entityName: "Contact",
				saveToTranscript: "Contact",
				showOnCreate: true,
				entityFieldMaps: [
					{
						doCreate: false,
						doFind: true,
						fieldName: "LastName",
						isExactMatch: true,
						label: "Last Name"
					},
					{
						doCreate: false,
						doFind: true,
						fieldName: "FirstName",
						isExactMatch: true,
						label: "First Name"
					},
					{
						doCreate: false,
						doFind: true,
						fieldName: "Email",
						isExactMatch: true,
						label: "Email"
					}
				]
			}
		]
	};

	const mergeSettings = function (customSettings) {
		Object.keys(customSettings)
			.forEach(function (key) {
				settings[key] = customSettings[key];
			});
	};

	const init = function () {
		if (!window.embedded_svc) {
			return setTimeout(init, 500);
		}

		mergeSettings(INSTALL_OPTIONS.other ? INSTALL_OPTIONS.other : {});

		return startChat(window.embedded_svc);
	};

	const startChat = function (embedded_svc) {
		embedded_svc.settings.displayHelpButton = settings.displayHelpButton;
		embedded_svc.settings.language = settings.language;

		embedded_svc.settings.defaultMinimizedText = settings.defaultMinimizedText;
		embedded_svc.settings.disabledMinimizedText = settings.disabledMinimizedText;

		embedded_svc.settings.loadingText = settings.loadingText;

		embedded_svc.settings.storageDomain = settings.storageDomain;

		embedded_svc.settings.avatarImgURL = settings.avatarImgURL;
		embedded_svc.settings.prechatBackgroundImgURL = settings.prechatBackgroundImgURL;
		embedded_svc.settings.waitingStateBackgroundImgURL = settings.waitingStateBackgroundImgURL;
		embedded_svc.settings.smallCompanyLogoImgURL = settings.smallCompanyLogoImgURL;

		embedded_svc.settings.enabledFeatures = settings.enabledFeatures;
		embedded_svc.settings.entryFeature = settings.entryFeature;
		embedded_svc.settings.prepopulatedPrechatFields = settings.prepopulatedPrechatFields; //Sets the auto-population of pre-chat form fields

		embedded_svc.settings.extraPrechatInfo = settings.extraPrechatInfo;

		embedded_svc.settings.targetElement = document.querySelector(INSTALL_OPTIONS.targetElement);

		const result = embedded_svc.init(
			INSTALL_OPTIONS.gslbBaseURL,
			INSTALL_OPTIONS.communityEndpointURL,
			'https://service.force.com',
			INSTALL_OPTIONS.orgId,
			'Chat', {
				baseLiveAgentContentURL: INSTALL_OPTIONS.baseLiveAgentContentURL,
				deploymentId: INSTALL_OPTIONS.deploymentId,
				buttonId: INSTALL_OPTIONS.buttonId,
				baseLiveAgentURL: INSTALL_OPTIONS.baseLiveAgentURL,
				eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I0N000000GmyyUAC_1617bf35f00'
			}
		);
	};

	init();
}())

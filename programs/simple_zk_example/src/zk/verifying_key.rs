use groth16_solana::groth16::Groth16Verifyingkey;

pub const VERIFYINGKEY: Groth16Verifyingkey =  Groth16Verifyingkey {
	nr_pubinputs: 2,

	vk_alpha_g1: [
		18,87,156,49,226,74,234,144,17,14,234,203,46,98,177,251,70,248,104,226,181,8,128,86,223,199,10,28,211,177,43,228,
		5,191,97,143,52,126,83,219,62,74,249,36,48,224,116,149,7,152,165,188,66,245,0,199,188,17,52,216,234,62,8,209,
	],

	vk_beta_g2: [
		40,49,55,89,161,23,217,99,163,183,235,142,252,166,53,247,214,24,126,101,116,220,163,48,92,112,93,97,154,182,199,176,
		27,230,173,238,253,213,188,45,243,251,242,163,132,38,138,106,47,187,176,147,47,123,99,39,212,132,167,236,152,46,144,47,
		34,236,138,141,251,29,227,62,70,247,214,60,39,124,42,167,42,71,41,111,18,192,135,164,117,232,144,82,31,57,165,238,
		25,1,117,192,46,207,252,253,127,64,197,63,238,174,125,137,111,7,74,142,74,170,242,161,235,5,123,176,212,55,11,118,
	],

	vk_gamme_g2: [
		25,142,147,147,146,13,72,58,114,96,191,183,49,251,93,37,241,170,73,51,53,169,231,18,151,228,133,183,174,243,18,194,
		24,0,222,239,18,31,30,118,66,106,0,102,94,92,68,121,103,67,34,212,247,94,218,221,70,222,189,92,217,146,246,237,
		9,6,137,208,88,95,240,117,236,158,153,173,105,12,51,149,188,75,49,51,112,179,142,243,85,172,218,220,209,34,151,91,
		18,200,94,165,219,140,109,235,74,171,113,128,141,203,64,143,227,209,231,105,12,67,211,123,76,230,204,1,102,250,125,170,
	],

	vk_delta_g2: [
		48,35,85,12,124,58,234,190,252,107,193,244,23,236,174,245,7,159,26,85,159,180,152,18,248,112,133,192,100,2,159,27,
		33,216,80,203,241,222,224,177,19,46,186,184,91,37,125,40,36,139,44,46,87,24,84,58,231,229,194,158,212,101,93,194,
		32,231,104,32,128,143,153,83,226,106,45,206,234,45,143,64,14,168,171,31,207,12,223,255,18,75,77,222,18,225,145,128,
		29,6,111,4,83,100,26,67,40,30,133,33,20,96,192,59,71,252,217,48,198,201,248,87,218,8,192,115,119,190,115,55,
	],

	vk_ic: &[
		[
			23,29,223,243,43,207,233,97,18,230,153,193,122,96,87,104,57,94,254,155,18,205,167,153,231,172,245,167,249,41,127,228,
			16,117,55,175,171,76,204,222,35,169,246,138,236,92,108,154,24,42,246,69,60,0,219,252,162,132,225,53,185,205,172,9,
		],
		[
			25,199,204,45,216,219,48,122,243,90,175,162,205,244,34,246,216,6,186,172,211,181,254,178,38,219,205,82,226,252,17,67,
			15,97,123,235,79,176,40,144,176,211,223,88,123,135,8,81,90,120,98,29,243,189,73,249,57,84,31,121,117,35,38,32,
		],
	]
};
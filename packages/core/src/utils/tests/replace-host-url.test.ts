import replaceHostUrl from '../replace-host-url';

describe( 'replaceHostUrl', () => {
	it( 'should replace the host URL with the new host URL when the URL starts with the host URL', () => {
		const url = 'https://old-host.com/path/to/resource';
		const hostUrl = 'https://old-host.com';
		const newHostUrl = 'https://new-host.com';
		const expected = 'https://new-host.com/path/to/resource';
		const result = replaceHostUrl( url, hostUrl, newHostUrl );
		expect( result ).toBe( expected );
	} );

	it( 'should return the same URL if it does not start with the host URL', () => {
		const url = 'https://other-host.com/path/to/resource';
		const hostUrl = 'https://old-host.com';
		const newHostUrl = 'https://new-host.com';
		const expected = 'https://other-host.com/path/to/resource';
		const result = replaceHostUrl( url, hostUrl, newHostUrl );
		expect( result ).toBe( expected );
	} );

	it( 'should return the same URL if the URL is empty', () => {
		const url = '';
		const hostUrl = 'https://old-host.com';
		const newHostUrl = 'https://new-host.com';
		const result = replaceHostUrl( url, hostUrl, newHostUrl );
		expect( result ).toBe( '' );
	} );

	it( 'should return the same URL if the host URL is empty', () => {
		const url = 'https://old-host.com/path/to/resource';
		const hostUrl = '';
		const newHostUrl = 'https://new-host.com';
		const result = replaceHostUrl( url, hostUrl, newHostUrl );
		expect( result ).toBe( url );
	} );

	it( 'should handle URLs with query parameters and fragments correctly', () => {
		const url = 'https://old-host.com/path/to/resource?query=1#fragment';
		const hostUrl = 'https://old-host.com';
		const newHostUrl = 'https://new-host.com';
		const expected =
			'https://new-host.com/path/to/resource?query=1#fragment';
		const result = replaceHostUrl( url, hostUrl, newHostUrl );
		expect( result ).toBe( expected );
	} );

	it( 'should handle URLs where newHostUrl is empty', () => {
		const url = 'https://old-host.com/path/to/resource';
		const hostUrl = 'https://old-host.com';
		const newHostUrl = '';
		const expected = '/path/to/resource';
		const result = replaceHostUrl( url, hostUrl, newHostUrl );
		expect( result ).toBe( expected );
	} );

	it( 'should handle cases where hostUrl and newHostUrl are identical', () => {
		const url = 'https://old-host.com/path/to/resource';
		const hostUrl = 'https://old-host.com';
		const newHostUrl = 'https://old-host.com';
		const expected = 'https://old-host.com/path/to/resource';
		const result = replaceHostUrl( url, hostUrl, newHostUrl );
		expect( result ).toBe( expected );
	} );
} );

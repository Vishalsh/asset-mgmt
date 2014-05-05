//<table class='table table-striped table-bordered'>
//    <thead>
//        <tr>
//            <th>Name</th>
//            <th>Properties</th>
//        </tr>
//    </thead>
//    <tbody>
//
//        <@ _.each(asset_types, function(asset_type) { @ >
//            <tr>
//                <td>
//                    <@= asset_type.get('name') @></td>
//                <td><@= asset_type.get('properties') @></td>
//            </tr>
//        <@ }); @>
//
//            </tbody>
//            </table>
//
